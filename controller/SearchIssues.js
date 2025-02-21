const axios = require('axios');
const Constants = require('../common/constants');
const RedisHandler = require('../common/redisHandler');
const { processHrTimeToSeconds } = require('../common/utils');


const searchIssues = async (searchQuery) => {

    const startTime = process.hrtime();
    const redisClient = RedisHandler.getRedisClient();


    const data = await redisClient.get(searchQuery + "_issues");
    if(data){
        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "REDIS",
        }
    }
    else {

        const response = await axios.get(Constants.GITHUB_SEARCH_URL + searchQuery);

        redisClient.set(searchQuery + "_issues", response.data.total_count, { 'EX': 60});
        console.log(response.data);

        return {
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "GITHUB_URL",
        }

    }


}

module.exports = {
    searchIssues
}