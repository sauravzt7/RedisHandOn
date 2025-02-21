const axios = require('axios');
const Constants = require('../common/Constants');
const { processHrTimeToSeconds } = require('../common/Utils');
const RedisHandler = require('../common/RedisHandler');


const SearchRepos = async (searchQuery) => {

    const redisClient = RedisHandler.getRedisClient();

    const startTime = process.hrtime();
    const data = await redisClient.get(searchQuery + "_repos");
    if (data)
        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "REDIS",
        }

    else {
        const response = await axios.get(Constants.GITHUB_SEARCH_REPOS_URL + searchQuery);
        await redisClient.set(searchQuery + "_repos", response.data.total_count, { 'EX': 60});

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