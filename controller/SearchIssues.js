const axios = require('axios');
const Constants = require('../common/Constants');
const RedisHandler = require('../common/RedisHandler');
const { processHrTimeToSeconds } = require('../common/Utils');


const SearchIssues = async (searchQuery) => {
    const redisClient = RedisHandler.getRedisClient();
    const startTime = process.hrtime();
    const data = await redisClient.get(searchQuery + "_issues");

    if (data)
        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "REDIS",
        }
    else {
        const response = await axios.get(Constants.GITHUB_SEARCH_ISSUES_URL + searchQuery);
        redisClient.set(searchQuery + "_issues", response.data.total_count, { 'EX': 30});

        return {
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "GITHUB_SEARCH_URL",
        }

    }
}

module.exports = {
    SearchIssues
};