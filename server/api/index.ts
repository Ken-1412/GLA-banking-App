// Vercel serverless function entry point
// This file is used when deploying to Vercel
import app from '../src/index.ts';

// Export a Vercel-compatible request handler that forwards requests to the
// Express app instance. Wrapping as a function makes invocation explicit
// and surfaces errors in logs instead of causing silent 404s.
export default function handler(req: any, res: any) {
	try {
		return app(req, res);
	} catch (err) {
		console.error('Serverless handler error:', err);
		// If headers not sent, return 500
		try {
			if (!res.headersSent) {
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		} catch (e) {
			// ignore
		}
	}
}
