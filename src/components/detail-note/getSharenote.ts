import axiosInstance from 'utils/axios';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA'
export const getShareNote = async (id:string) => {
  return await axiosInstance.get(`https://life-at-kmitl-backend-production.up.railway.app/sharenote/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
  });
};
export const putLike = async (sharenoteId:string) => {
  return await axiosInstance.put(`https://life-at-kmitl-backend-production.up.railway.app/sharenote/like/${sharenoteId}`,{},{
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
  });
};