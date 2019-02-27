const kue = require('kue')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

// Toda vez que um job for disparado com esta key, disparará o método handle
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

module.exports = Queue
