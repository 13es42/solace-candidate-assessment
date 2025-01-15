"use client";

import { useEffect, useState } from "react";
import AdvocatesTable from "./components/advocates";

//TODO: 
// 1. Fix search functionality => make everything lowercase to match
// 2. Add a filter for specialties
// 3. Add a filter for years of experience
// 4. Seperate data to be more readable
// 5. add error handling
// 6. add loading state
// 7. maybe break out reusable componenents
// 8. add interface and types for data
// 9. add maps for display strings

// needed interface for TypeScript and data sanity
interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}


export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  // add type for input.
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    // handle error if element is not found or defined.
    // document.getElementById("search-term").innerHTML = searchTerm;
    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    // cant set a state variable this way.  must use a different variable to set state later.
    // const advocatesFiltered = advocates.filter((advocate: Advocate) => {
    //   // cant use includes like this becasue it doesnt allow for words.  need to use a regex or something else.
    //   return (
    //     advocate.firstName.includes(searchTerm) ||
    //     advocate.lastName.includes(searchTerm) ||
    //     advocate.city.includes(searchTerm) ||
    //     advocate.degree.includes(searchTerm) ||
    //     advocate.specialties.includes(searchTerm) ||
    //     advocate.yearsOfExperience.toString().includes(searchTerm) // convert to string to match for includes search
    //   );
    // });

    const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive matching

    const advocatesFiltered = advocates.filter((advocate: Advocate) => {
      return (
        regex.test(advocate.firstName) ||
        regex.test(advocate.lastName) ||
        regex.test(advocate.city) ||
        regex.test(advocate.degree) ||
        advocate.specialties.some((specialty) => regex.test(specialty)) ||
        regex.test(advocate.yearsOfExperience.toString())
      );
    });

    setFilteredAdvocates(advocatesFiltered);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  // removed hard coded table and replaced with AdvocatesTable component
  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button className='btn btn-solaceColor py-0 px-3 rounded mx-2' onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocatesTable 
        header={' '}
        data={filteredAdvocates}

      />
      {/* <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </main>
  );
}
