import axiosInstance from 'utils/axios';
export const getShareNote = async (id:string) => {
  return await axiosInstance.get(`/sharenote/${id}`, {

  });
};
export const putLike = async (sharenoteId:string) => {
  return await axiosInstance.put(`sharenote/like/${sharenoteId}`,{},{
  });
};