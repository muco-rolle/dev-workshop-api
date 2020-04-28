import { ApolloError } from 'apollo-server';

// simplify the apollo error class
export const error = (message: string, code: string) =>
	new ApolloError(message, code);

export const mergeResolvers = (...resolvers: any) => [...resolvers];
export const mergeMiddlawares = (...middlewares: any) => [...middlewares];

// check if a property exist on an object
export const checkProperty = (object: {}, property: string) => {
	return object && object.hasOwnProperty(property);
};
