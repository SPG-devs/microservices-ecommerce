import { INestApplication } from '@nestjs/common'; // Add the necessary import
import { RmqService } from '../rmq/rmq.service'; // Assuming RmqService is correctly imported

export const connectMicroservicesQueues = async (
  app: INestApplication,
  queues: string[],
) => {
  const rmqService = app.get<RmqService>(RmqService);
  try {
    queues.forEach((queue) => {
      // Establishing connection to RabbitMQ service
      app.connectMicroservice(rmqService.getOptions(queue));
      console.log(`configure to connect ${queue} microservices`);
    });
    // Start all microservices asynchronously
    await app.startAllMicroservices();
    console.log('Microservices connected and started successfully');
  } catch (error) {
    // Catch and log errors
    console.error('Error in setting up app microservices: ', error);
    throw error; // Optional: rethrow to allow further handling upstream if needed
  }
};
