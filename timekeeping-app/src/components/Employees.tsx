import React from 'react';
import type { Employee } from '../types/types';

interface Props {
  employees: Employee[];
}

const EmployeeList: React.FC<Props> = ({ employees }) => {
  return (
    <div>
      <h2>Lista Angajaților</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;