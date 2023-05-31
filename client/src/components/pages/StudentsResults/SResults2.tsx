import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';

interface Users {
    userid: string;
    userRole:string;
    nameWithInitials: string;
    fullName:string;
    phoneNo:string
    dateOfBirth:string;
    email: string;
    nic:string;
    
  }

interface Subject {
  subjectId:string;
  classRoomId: string;
  subjectName:string;
  teacherId:string;
}


  function GetSubjectNameBySubjectId({ subjectId }: { subjectId: string }): JSX.Element | null{
    interface Section {
      subjectName:string;
    }
    const [section, setSection] = useState<Section | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`)
        .then(res => res.json())
        .then(data => setSection(data))
        .catch(error => console.error(error));
    }, []);
  
    return section ? <span>{section.subjectName}</span> : null;
  }

const SResults2: React.FC = () => {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const [subject, setSubject] = useState<Subject[]>([]);
  const { classId } = useParams<{ classId: string }>();
  const defaultclassId='';


  function GetResult({ subjectId, classId, term, userid }: { subjectId: string, classId: string, term: string, userid: string }): JSX.Element | null {
    interface Result {
      result: string;
    }
  
    const [result, setResult] = useState<Result | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/result/${subjectId}/${classId}/${userid}/${term}`)
        .then(res => res.json())
        .then(data => setResult(data))
        .catch(error => console.error(error));
    }, [subjectId, classId, term, userid]);
  
    return result ? <span>{result.result}</span> : null;
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/subjects/classRoomId/${classId}`); 
      const data = await result.json();
      setSubject(data);
    };

    fetchData();
  }, []);

  return (
    <div>

    <div className="fixed z-20 w-[100%]">
    <HiBars4  
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl `} onClick={() => setOpen(!open)}/>
      <NavBar/>
    </div>

    <div className="flex">
      
      <div className={` ${open ? "w-[15vw]" : "scale-0"} pt-[14.5vh] z-10 duration-100`} >
         <SideBarAdmin/>
      </div>
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"} min-w-[85vw]`}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen  ${open ? "w-[85vw]" : "w-[100vw]"}`}>  
    <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-white rounded-lg`}>
     <div className='text-2xl'>
     StudentName results
     </div>
      </div>
      
    <table className='border-2 border-blue-600 mt-[5vh]'>
      <thead>
        <tr className="border-2 border-blue-600">
          <th className="w-[15vw] p-[1.5vh] text-left pl-16">Subjet Name</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 1</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 2</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 3</th>
        </tr>
      </thead> 
      <tbody>
        {subject.map(subject => (
            
          <tr key={subject.subjectId} className="cursor-pointer hover:bg-slate-200">
            <td className="w-[15vw] h-[10vh] text-left pl-16">{subject.subjectName}</td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subject.subjectId}userid="987654" classId={classId ?? defaultclassId} term={'term1'}/> {/*Hardcoded*/}
                </div>
  
              </div>
            </td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subject.subjectId} userid="987654" classId={classId ?? defaultclassId} term={'term2'}/> {/*Hardcoded*/}
                </div>

              </div>
            </td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subject.subjectId} userid="987654" classId={classId ?? defaultclassId} term={'term3'}/> {/*Hardcoded*/}
                </div>
              </div>
            </td>

          </tr>

        ))}
      </tbody>
    </table>
 </div>


    </div>
  
    </div>

     </div>
     
    
  );
};

export default SResults2;
