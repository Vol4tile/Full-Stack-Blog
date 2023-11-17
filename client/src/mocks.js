import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Create a mock server
const server = setupServer(
  // Define a request handler for the GET request to /post/LatestPosts
  rest.get('http://localhost:5000/post/LatestPosts', (req, res, ctx) => {
    // Define the response data here
    const mockResponse = [
      // Define your mock response data here
      { _id: 1, baslik: 'Mock Post 1' },
      { _id: 2, baslik: 'Mock Post 2' },
    ];

    return res(ctx.json(mockResponse));
  })
);

export default server;