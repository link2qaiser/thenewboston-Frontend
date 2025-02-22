import {RootState} from 'types';

export const getAddresses = (state: RootState) => state.addresses;
export const getArtworks = (state: RootState) => state.artworks;
export const getArtworkTransfers = (state: RootState) => state.artworkTransfers;
export const getAssetPairs = (state: RootState) => state.assetPairs;
export const getAuthentication = (state: RootState) => state.authentication;
export const getCartProducts = (state: RootState) => state.cartProducts;
export const getComments = (state: RootState) => state.comments;
export const getContributions = (state: RootState) => state.contributions;
export const getConversations = (state: RootState) => state.conversations;
export const getCores = (state: RootState) => state.cores;
export const getCourses = (state: RootState) => state.courses;
export const getExchangeOrders = (state: RootState) => state.exchangeOrders;
export const getFollowers = (state: RootState) => state.followers;
export const getFollowings = (state: RootState) => state.followings;
export const getInvitationLimits = (state: RootState) => state.invitationLimits;
export const getInvitations = (state: RootState) => state.invitations;
export const getLectures = (state: RootState) => state.lectures;
export const getManager = (state: RootState) => state.manager;
export const getMessages = (state: RootState) => state.messages;
export const getNotifications = (state: RootState) => state.notifications;
export const getOrders = (state: RootState) => state.orders;
export const getPosts = (state: RootState) => state.posts.posts;
export const getProducts = (state: RootState) => state.products;
export const getSelf = (state: RootState) => state.self;
export const getTrades = (state: RootState) => state.trades;
export const getUserStats = (state: RootState) => state.userStats;
export const getUsers = (state: RootState) => state.users;
export const getIa = (state: RootState) => state.ia;
export const getWallets = (state: RootState) => state.wallets;
export const getWires = (state: RootState) => state.wires;
export const hasMorePosts = (state: RootState) => state.posts.hasMore;
export const isLoadingPosts = (state: RootState) => state.posts.isLoading;
