import axios from 'axios';
import { useQuery as useReactQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useQuery = (key, options) => {
  const navigate = useNavigate();
  const fetcher = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/${key}`).catch((err) => {
      navigate('/login');
    });
  };
  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useReactQuery(key, fetcher, {
    refetchOnWindowFocus: false,
    ...options,
  });
  return { data: result?.data, loading: isLoading, error, refetch };
};

export default useQuery;
