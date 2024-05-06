import React, { useState, useEffect } from 'react';
import CustomizedTextField from '../../package/Textfield';
import './FilterSidebar.css';

export default function FilterComponent({ onFilterChange: handleFilterChange }) {
  const [searchValue, setSearchValue] = useState('');
  const [roles, setRoles] = useState([]);
  const [remote, setRemote] = useState([]);
  const [noOfEmployees, setNoOfEmployees] = useState([]);
  const [techStack, setTechStack] = useState([]);

  const handleFilterValueChange = (filterType, filterValue) => {
    switch (filterType) {
      case 'searchValue':
        setSearchValue(filterValue);
        break;
      case 'roles':
        setRoles(filterValue);
        break;
      case 'remote':
        setRemote(filterValue);
        break;
      case 'noOfEmployees':
        setNoOfEmployees(filterValue);
        break;
      case 'techStack':
        setTechStack(filterValue);
        break;
      default:
        break;
    }
  };

  const roleOptions = ['Frontend', 'Backend', 'iOS', 'Android'];
  const remoteOptions = ['Remote', 'On-site'];
  const techStackOptions = ['React', 'Angular', 'Vue', 'Node.js'];
  const minExp = ['0-10','11-50','51-100','101-500']

  useEffect(() => {
    handleFilterChange({ searchValue, roles, remote, noOfEmployees, techStack });
  }, [searchValue, roles, remote, noOfEmployees, techStack, handleFilterChange]);

  return (
    <div className="sideBar">
   

      <CustomizedTextField
        label="Roles"
        data={roleOptions}
        type="roles"
        onChange={(value) => handleFilterValueChange('roles', value)}
      />

      <CustomizedTextField
        label="Remote"
        data={remoteOptions}
        type="remote"
        onChange={(value) => handleFilterValueChange('remote', value)}
      />

      <CustomizedTextField
        label="Number of Employees"
        data={minExp}
        type="noOfEmployees"
        onChange={(value) => handleFilterValueChange('noOfEmployees', value)}
      />

      <CustomizedTextField
        label="Tech Stack"
        data={techStackOptions}
        type="techStack"
        onChange={(value) => handleFilterValueChange('techStack', value)}
      />
    </div>
  );
}