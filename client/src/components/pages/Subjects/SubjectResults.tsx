import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { CloseButton, ResultsAdd} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddSubjectResultsPopup from './AddSubjectResultsPopup';

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

interface ViewLinkProps {
    url: string;
    children?: React.ReactNode;
  }

  function GetSubjectNameBySubjectId({ subjectId }: { subjectId: string }): JSX.Element | null{
    interface Section {
      subjectName:string;
    }
    const [section, setSection] = useState<Section | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/subjects/${subjectId}`)
        .then(res => res.json())
        .then(data => setSection(data))
        .catch(error => console.error(error));
    }, []);
  
    return section ? <span>{section.subjectName}</span> : null;
  }


  interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

const SubjectResults: React.FC = () => {
  const [open, setOpen] = useState(true); 
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const { classId } = useParams<{ classId: string }>();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [userId, setUserId] = useState(""); 
  const [term, setTerm] = useState(""); 
  const defaultclassId='';
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultclassId}/>




  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

 


  function GetResult({ subjectId, classId, term, userid }: { subjectId: string, classId: string, term: string, userid: string }): JSX.Element | null {
    interface Result {
      result: string;
    }
  
    const [result, setResult] = useState<Result | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/result/${subjectId}/${classId}/${userid}/${term}`)
        .then(res => res.json())
        .then(data => setResult(data))
        .catch(error => console.error(error));
    }, [subjectId, classId, term, userid]);
  
    return result ? <span>{result.result}</span> : null;
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/vi/users/class/${classId}`); 
      const data = await result.json();
      setUsersStudent(data);
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
     {subjectName} results
     </div>
      </div>
      
    <table className='border-2 border-blue-600 mt-[5vh]'>
      <thead>
        <tr className="border-2 border-blue-600">
          <th className="w-[15vw] p-[1.5vh] text-left pl-8">UserID</th>
          <th className="w-[15vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 1</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 2</th>
          <th className="w-[15vw] p-[1.5vh] text-center">Term 3</th>
        </tr>
      </thead> 
      <tbody>
        {usersStudent.map(user => (
            
          <tr key={user.userid} className="cursor-pointer hover:bg-slate-200">
            <td className="w-[15vw] h-[10vh] text-left  pl-8">{user.userid}</td>
            <td className="w-[15vw] h-[10vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subjectId ?? defaultclassId} userid={user.userid} classId={classId ?? defaultclassId} term={'term1'}/> 
                </div>
                <div className='basis-1/4'>
                  <button onClick={() => {
                    setVisibleAdd(true);
                    setUserId(user.userid);
                    setTerm("term1")}}>
                      <ResultsAdd/>
                  </button>
                </div>
              </div>
            </td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subjectId ?? defaultclassId} userid={user.userid} classId={classId ?? defaultclassId} term={'term2'}/> 
                </div>
                <div className='basis-1/4'>
                  <button onClick={() => {
                    setVisibleAdd(true);
                    setUserId(user.userid);
                    setTerm("term2")}}>
                      <ResultsAdd/>
                  </button>
                </div>
              </div>
            </td>
            <td className="w-[15vw] h-[10vh] text-center border-2 border-blue-600">
              <div className='flex'>
                <div className='ml-10 basis-3/4'>
                  <GetResult subjectId={subjectId ?? defaultclassId} userid={user.userid} classId={classId ?? defaultclassId} term={'term3'}/> 
                </div>
                <div className='basis-1/4'>
                  <button onClick={() => {
                    setVisibleAdd(true);
                    setUserId(user.userid);
                    setTerm("term3")}}>
                      <ResultsAdd/>
                  </button>
                </div>
              </div>
            </td>

          </tr>

        ))}
      </tbody>
    </table>
 </div>


    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddSubjectResultsPopup  subjectId={subjectId ?? defaultclassId} classId={classId??defaultclassId} userid={userId} term={term}/>
          </div>
        </div>
      )} 
    

    </div>
  
    </div>

     </div>
     
    
 
      
  
    
  );
};

export default SubjectResults;
