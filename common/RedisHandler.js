const redis = require('redis');

class RedisHandler {
    #redisClient

    constructor() {

        if(RedisHandler.sigleInstance){
            return RedisHandler.sigleInstance;
        }
        else RedisHandler.sigleInstance = this;
    }

    init = async () => {
        if(this.#redisClient) return;

        this.#redisClient = redis.createClient();
        this.#redisClient.connect();
    }

    getRedisClient = () => {
        if(this.#redisClient) return this.#redisClient;
        this.#redisClient = redis.createClient();
        return this.#redisClient;
    }

}

const redisHandler = new RedisHandler();

module.exports = redisHandler;
