import axiosInstance from 'utils/axios';
import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA'
export const getShareNote = async (id:string) => {
  const path = `/sharenote/${id}`
  return await axiosInstance.get(path, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};
export const putLike = async (sharenoteId:string) => {
  const path = `/sharenote/like/${sharenoteId}`
  return await axiosInstance.put(path,{},{
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};