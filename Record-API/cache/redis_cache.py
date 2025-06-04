import redis
import json
from config import REDIS_CONFIG

redis_client = redis.Redis(**REDIS_CONFIG)

def cache_message(key, data):
    redis_client.setex(key, 10, json.dumps(data))

def get_cached_message(key):
    cached = redis_client.get(key)
    return json.loads(cached) if cached else None
