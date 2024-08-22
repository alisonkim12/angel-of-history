import requests
import json
from datetime import datetime, timedelta
import time
import os
from dotenv import load_dotenv

def generate_gnews_api_query(api_token, query):
    # Calculate the start and end dates of the current week
    today = datetime.today()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    from_date = start_of_week.strftime('%Y-%m-%d')
    to_date = end_of_week.strftime('%Y-%m-%d')

    api_url = f"https://gnews.io/api/v4/top-headlines?q={query}&token={api_token}&lang=en&max=10&from={from_date}&to={to_date}" 
    return api_url

def fetch_top_headlines(api_url):
    max_retries = 4
    backoff_factor = 5
    retries = 0
    while retries < max_retries:
        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()
            return data
        except requests.exceptions.RequestException as e:
            print(f"Error fetching headlines: {e}")
            retries += 1
            if retries < max_retries:
                delay = backoff_factor ** retries
                print(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print(f"Max retries reached. Unable to fetch headlines.")
                return None

def should_update_news(json_path):
    if not os.path.exists(json_path):
        return True
    with open(json_path, "r") as json_file:
        data = json.load(json_file)
        last_updated = datetime.strptime(data['last_updated'], '%Y-%m-%d %H:%M:%S')
    return (datetime.now() - last_updated) > timedelta(hours=24)

def update_news(api_token, query_list, json_path):
    news_headlines = []
    for each_query in query_list:
        api_url = generate_gnews_api_query(api_token, each_query)
        news_headlines.append(fetch_top_headlines(api_url))
    with open(json_path, "w") as json_file:
        json.dump({'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'news': news_headlines}, json_file)

def main():
    load_dotenv() 
    api_token = os.getenv('news_api_token')
    query_list = ["Al Jazeera", "climate", "international current events", "violence", "housing", "children", "war"]
    json_path = "news.json"
    
    if should_update_news(json_path):
        print("Updating news data...")
        update_news(api_token, query_list, json_path)
    else:
        print("Using cached news data...")

if __name__ == "__main__":
    main()


# import requests
# import json
# from datetime import datetime, timedelta
# import time 

# def generate_gnews_api_query(api_token, query):
#     # Calculate the start and end dates of the current week
#     today = datetime.today()
#     start_of_week = today - timedelta(days=today.weekday())
#     end_of_week = start_of_week + timedelta(days=6)
#     from_date = start_of_week.strftime('%Y-%m-%d')
#     to_date = end_of_week.strftime('%Y-%m-%d')

#     api_url = f"https://gnews.io/api/v4/top-headlines?q={query}&token={api_token}&lang=en&max=10&from={from_date}&to={to_date}" 
#     return api_url

# def fetch_top_headlines(api_url):
#     max_retries = 4
#     backoff_factor = 5
#     retries = 0
#     while retries < max_retries:
#         try:
#             response = requests.get(api_url)
#             response.raise_for_status()  
#             data = response.json()
#             return data
        
#         except requests.exceptions.RequestException as e:
#             print(f"Error fetching headlines: {e}")
#             retries += 1
#             if retries < max_retries:
#                 delay = backoff_factor ** retries
#                 print(f"Retrying in {delay} seconds...")
#                 time.sleep(delay)
#             else:
#                 print(f"Max retries reached. Unable to fetch headlines.")
#                 return None
#     # try:
#     #     response = requests.get(api_url)
#     #     response.raise_for_status()  
#     #     data = response.json()
#     #     return data
    
#     # except requests.exceptions.RequestException as e:
#     #     print(f"Error fetching headlines: {e}")
#     #     return None

# def main():
#     api_token = '11a23243f8844cd59b191b3040e726f2'
#     query_list = ["Al Jazeera", "climate", "international current events","violence", "housing", "children", "war"]
#     news_headlines = []
#     for each_query in query_list: 
#         api_url = generate_gnews_api_query(api_token, each_query)
#         news_headlines.append(fetch_top_headlines(api_url))
#     with open("news.json", "w") as json_file: 
#         json.dump(news_headlines, json_file)
   
# if __name__ == "__main__":
#     main()
