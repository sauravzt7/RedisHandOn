
const axios = require('axios');

const Constants = require('../common/constants');
const { processHrTimeToSeconds } = require('../common/utils');
const RedisHandler = require('../common/redisHandler');


const SearchRepos = async (searchQuery) =>{

    const redisClient = RedisHandler.getRedisClient();
    const startTime = process.hrtime();
    const data = await redisClient.get(searchQuery + "_repos");

    if(data){

        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "REDIS",
        }
    }
    else {
        const response = await axios.get(Constants.GITHUB_SEARCH_URL + searchQuery);
        await redisClient.set(searchQuery + "_repos", response.data, { 'EX': 60});

        return {
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "GITHUB_URL",
        }
    }
};

module.exports = {
    SearchRepos
};