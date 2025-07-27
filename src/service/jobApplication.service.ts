import API from './data.service';
import { FilterJobApplications } from '../types/Entreprise';
import { JobApplicationRequest, JobApplicationResponse } from '../types/Entreprise';

export const getAllJobApplications = async (): Promise<JobApplicationResponse[]> => {
    const res = await API.get('/job');
    return res.data;
}

export const getJobApplicationById = async (id: string): Promise<JobApplicationRequest> => {
    const res = await API.get(`/job/${id}`);
    return res.data;
}

export const create = async (data: JobApplicationRequest) => {
    const res = await API.post('/job', data);
    return res.data;
}

export const update = async (data: JobApplicationRequest) => {
    const res = await API.post('/job', data);
    return res.data;
}

export const deleteJob = async (id: number) => {
    const res = await API.delete(`/job/delete/${id}`);
    return res.data;
}

export const search = async (query: string): Promise<JobApplicationResponse[]> => {
    const res = await API.get(`/job/search/${query}`);
    return res.data;
}

export const filterJobApplications = async (filters: FilterJobApplications): Promise<JobApplicationResponse[]> => {
  const res = await API.post('/job/filter', filters);
  return res.data;
};
