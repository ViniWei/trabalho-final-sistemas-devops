import redis
import os

redis_host = os.getenv('REDIS_HOST', 'redis')
redis_client = redis.Redis(host=redis_host, port=6379, db=0)
