const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

// Toda vez que um job for disparado com esta key, disparará o método handle
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

// Sempre que tiver um erro dentro de nossa fila, o sentry também vai capturar
Queue.on('error', Sentry.captureException)

module.exports = Queue
