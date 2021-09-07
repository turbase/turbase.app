import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createWriteStream } from "fs";
import { all_actions_file } from "../allActionsWriter";

console.log(__dirname + '/loads.log')
var loads_file = createWriteStream(__dirname + '/loads.log', {flags : 'a'});

export default async function loadController(fastify: FastifyInstance) {
  // GET /
  fastify.post("/", async function (
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    var logEntry = new Date().toISOString() + '\t' + _request.ip + '\n'
    loads_file.write(logEntry)
    all_actions_file.write('LOAD PAGE    \t' + logEntry)
    reply
      .header("Content-Type", "text/html; charset=utf-8")
      .send('loaded');
  });
}