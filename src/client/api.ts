import axios from 'axios';
import { ClusterNode } from '../model';


export const getVideoList = async () => {
  const response = await axios.get('http://localhost:8081/video_list');
  return response.data;
}


export const getNodes = async (): Promise<ClusterNode[]> => {
  const host = window.location.hostname;
  const response = await axios.get(`http://${host}:8081/nodes`);
  return response.data;
}

export const getScreen = async (host: string): Promise<string> => {
  const response = await axios.get(`http://${host}:8081/screen?${new Date().getTime()}`);
  return response.data;
}

export const playVideo = async (host: string): Promise<string> => {
  const response = await axios.get(`http://${host}:8081/play`);
  return response.data;
}

export const pauseVideo = async (host: string): Promise<string> => {
  const response = await axios.get(`http://${host}:8081/pause`);
  return response.data;
}
