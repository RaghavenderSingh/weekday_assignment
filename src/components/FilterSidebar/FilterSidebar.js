import React, { useState, useEffect } from "react";
import CustomizedTextField from "../../package/Textfield";
import "./FilterSidebar.css";
import { Autocomplete, TextField } from "@mui/material";

export default function FilterComponent({ onFilterChange: handleFilterChange }) {
  const [searchValue, setSearchValue] = useState('');
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [roles, setRoles] = useState([]);
  const [remote, setRemote] = useState([]);
  const [noOfEmployees, setNoOfEmployees] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [minBasePay, setMinBasePay] = useState('');
  const [minExp, setMinExp] = useState('');

  const handleFilterValueChange = (filterType, filterValue) => {
    switch (filterType) {
      case 'searchValue':
        setSearchValue(filterValue);
        break;
      case 'companySearchValue':
        setCompanySearchValue(filterValue);
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
      case 'minBasePay':
        setMinBasePay(filterValue);
        break;
      case 'minExp':
        setMinExp(filterValue);
        break;
      default:
        break;
    }
  };

  const roleOptions = ['Frontend', 'Backend', 'iOS', 'Android'];
  const remoteOptions = ['Remote', 'On-site'];
  const techStackOptions = ['React', 'Angular', 'Vue', 'Node.js'];
  const minEmpl = ['0-10', '11-50', '51-100', '101-500'];
  const minExpOptions = ['1', '2', '3', '4', '5'];

  useEffect(() => {
    handleFilterChange({ searchValue, companySearchValue, roles, remote, noOfEmployees, techStack, minBasePay, minExp });
  }, [searchValue, companySearchValue, roles, remote, noOfEmployees, techStack, minBasePay, minExp, handleFilterChange]);

  return (
    <div className="sideBar">
      <TextField
        label="Search Company"
        type="companySearchValue"
        onChange={(value) =>
          handleFilterValueChange("companySearchValue", value.target.value)
        }
        size="small"
      />

      <CustomizedTextField
        label="Roles"
        data={roleOptions}
        type="roles"
        onChange={(value) => handleFilterValueChange("roles", value)}
      />

      <CustomizedTextField
        label="Remote"
        data={remoteOptions}
        type="remote"
        onChange={(value) => handleFilterValueChange("remote", value)}
      />

      <CustomizedTextField
        label="Number of Employees"
        data={minEmpl}
        type="noOfEmployees"
        //no params provided so it will not work
        onChange={(value) => handleFilterValueChange("noOfEmployees", value)}
      />

      <CustomizedTextField
        label="Tech Stack"
        data={techStackOptions}
        type="techStack"
        //no params provided so it will not work
        onChange={(value) => console.log(value)}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        size="small"
        options={minEmpl}
        sx={{ minWidth: "150px" }}
        onChange={(event, value) => handleFilterValueChange('minBasePay', value)}
        renderInput={(params) => <TextField {...params} label="Min Base Pay" />}
      />

      <Autocomplete
  disablePortal
  id="combo-box-demo"
  size="small"
  options={minExpOptions}
  sx={{ minWidth: "150px" }}
  onChange={(event, value) => handleFilterValueChange('minExp', value ? parseInt(value) : null)}
  renderInput={(params) => <TextField {...params} label="Min Experience" />}
/>
    </div>
  );
}