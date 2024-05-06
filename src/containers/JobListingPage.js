import React, { useState, useEffect, useCallback } from 'react';
import { useGetJobsQuery } from '../api/jobsApi';
import JobCard from '../components/Jobcard/JobCard';
import FilterComponent from '../components/FilterSidebar/FilterSidebar';
import { Grid } from '@mui/material';

const JobListingPage = () => {
  const [page, setPage] = useState(1);
  const [filterParams, setFilterParams] = useState({});
  const [combinedJobData, setCombinedJobData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, isFetching } = useGetJobsQuery({ ...filterParams, searchQuery: searchValue, page }, { keepPreviousData: true });

  useEffect(() => {
    if (data?.jdList) {
      const filteredJobs = data.jdList.filter(job =>
        Object.values(job).some(value =>
          typeof value === 'string' && value && value.toLowerCase().includes(searchValue.toLowerCase())
        )
      );

      setCombinedJobData(prevData => {
        const newData = [...prevData, ...filteredJobs];
        const filteredData = filterJobData(newData, filterParams);
        const finalFilteredData = filteredData.filter(job =>
          Object.values(job).some(value =>
            typeof value === 'string' && value && value.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        return finalFilteredData;
      });
    }
  }, [data, searchValue, filterParams]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  const handleFilterChange = useCallback((filterObject) => {
    const { searchValue, companySearchValue, roles, remote, noOfEmployees, techStack, minBasePay } = filterObject;
    setFilterParams({ searchValue, companySearchValue, roles, remote, noOfEmployees, techStack, minBasePay });
    setSearchValue(searchValue);
    setPage(1);
    setCombinedJobData([]);
  }, []);

  const filterJobData = (jobData, filterParams) => {
    const { roles, remote, noOfEmployees, techStack, companySearchValue, minBasePay } = filterParams;

    return jobData.filter(job => {
      const { companyName, basePay } = job;

      // Filter by company name
      if (companySearchValue && !companyName.toLowerCase().includes(companySearchValue.toLowerCase())) {
        return false;
      }

      // Filter by min base pay
      if (minBasePay && basePay < minBasePay) {
        return false;
      }

      // Filter by roles
      if (roles.length > 0 && !roles.some(role => role.toLowerCase() === job.jobRole.toLowerCase())) {
        return false;
      }

      // Filter by remote
      if (remote.length > 0 && !remote.includes(job.isRemote ? 'Remote' : 'On-site')) {
        return false;
      }

      // Filter by number of employees
      const employeeRange = getEmployeeRange(job.noOfEmployees);
      if (noOfEmployees.length > 0 && !noOfEmployees.includes(employeeRange)) {
        return false;
      }

      // Filter by tech stack (assuming job.techStack is an array)
      if (techStack.length > 0 && !job.techStack.some(tech => techStack.includes(tech))) {
        return false;
      }

      return true;
    });
  };

  const getEmployeeRange = (noOfEmployees) => {
    if (noOfEmployees <= 10) {
      return '0-10';
    } else if (noOfEmployees <= 50) {
      return '11-50';
    } else if (noOfEmployees <= 100) {
      return '51-100';
    } else if (noOfEmployees <= 500) {
      return '101-500';
    } else if (noOfEmployees <= 1000) {
      return '501-1000';
    } else {
      return '1000+';
    }
  };

  const displayCardStyle = {
    display: "flex",
    flexWrap: "wrap",
    alignContent: 'flex-start',
    gap: "10"
  };
  const container ={
    padding: "40px",
    margin: "16px 50px",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  }
  const  centerItem ={
    display: "flex",
    justifyContent: "center",
  }

  return (
    <div style={container}>
    <div style={centerItem}>
      <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
  
        <Grid sx={centerItem} container spacing={2}>
          {combinedJobData.map((job) => <JobCard key={job.jdUid} jobData={job} />)}
        </Grid >
       
      )}
      {isFetching && !isLoading && <div>Loading more jobs...</div>}
    </div>
  );
};

export default JobListingPage;