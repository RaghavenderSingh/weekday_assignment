
import React, { useState, useEffect, useCallback } from 'react';
import { useGetJobsQuery } from '../api/jobsApi';
import JobCard from '../components/Jobcard/JobCard';
import FilterComponent from '../components/FilterSidebar/FilterSidebar';


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

      console.log('Filtered jobs based on search:', filteredJobs);

      setCombinedJobData(prevData => {
        const newData = [...prevData, ...filteredJobs];
        const filteredData = filterJobData(newData, filterParams);

        console.log('Filtered data after applying all filters:', filteredData);

        const finalFilteredData = filteredData.filter(job =>
          Object.values(job).some(value =>
            typeof value === 'string' && value && value.toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        console.log('Final filtered data:', finalFilteredData);

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
    setFilterParams(filterObject);
    setSearchValue(filterObject.searchValue);
    setPage(1);
    setCombinedJobData([]);
  }, []);

  const filterJobData = (jobData, filterParams) => {
    console.log('Filtering job data:', jobData, filterParams);

    return jobData.filter(job => {
      const { roles, remote, noOfEmployees, techStack } = filterParams;

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
    gap: "10px",
    padding: "30px",
  };

  return (
    <div style={{ padding: "40px",margin:"16px 50px " }}>
      <FilterComponent onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={displayCardStyle}>
          {combinedJobData.map((job) => <JobCard key={job.jdUid} jobData={job} />)}
        </div>
      )}
      {isFetching && !isLoading && <div>Loading more jobs...</div>}
    </div>
  );
};

export default JobListingPage;