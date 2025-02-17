import './App.css';
import { useState } from 'react';
import contactsJson from './contacts.json'

function App() {
  const [contacts, setContacts]=useState(contactsJson.slice(0,5))
  const [contactsLength, setContactsLength] = useState(6)

  function addRandom(){
    let allContacts = [...contactsJson];
    const randomContact =Math.floor(Math.random()*(allContacts.length-5)+5)
    let contactCopy = [...contacts]
    contactCopy.push(allContacts[randomContact])
    setContactsLength(contactsLength+1)
    setContacts(contactCopy.slice(0,contactsLength))
  }
  function sortByName(){
    let contactsCopy = [...contacts];
    contactsCopy.sort((a,b) => a.name.localeCompare(b.name))
    console.log('contacts' , contacts)
    console.log('contactCopy', contactsCopy)
    setContacts(contactsCopy)
  }

  function sortByPopularity(){
    let contactsCopy = [...contacts];
    contactsCopy.sort((a,b) => b.popularity-a.popularity)
    console.log('contacts' , contacts)
    console.log('contactCopy', contactsCopy)
    setContacts(contactsCopy)
  }

  function deleteContact(index){
    let contactsCopy = [...contacts];
    contactsCopy.splice(index, 1)
    setContacts(contactsCopy)
  }
  return (
    <div className="App">
      <h1>IronContacts</h1>
      <header>
        <button onClick={function(){addRandom()}}>Add a Random Contact</button>
        <button onClick={function(){sortByName()}}>Sort by Name</button>
        <button onClick={function(){sortByPopularity()}}>Sort by Popularity</button>
      </header>
    
      <table> 
        <thead>
          <tr key="description">
            <td key="Picture"><b>Picture</b></td>
            <td key="Name"><b>Name</b></td>
            <td key="Popularity"><b>Popularity</b></td>
            <td key="WonOscar"><b>Won an Oscar</b></td>
            <td key="WonEmmy"><b>Won an Emmy</b></td>
            <td key="Actions"><b>Actions</b></td>
          </tr>
        </thead>
        <tbody>  
          {
            contacts.map((el,i) => {
              return(
                <tr key={i}>
                  <td key={el.pictureUrl}><img src={el.pictureUrl} alt='pictureImg'/></td>
                  <td key={el.name}>{el.name}</td>
                  <td key={el.popularity}>{Math.round(el.popularity*100)/100}</td>
                  <td key={i + 0.25}>{el.wonOscar && '🏆'}</td>
                  <td key={i + 0.5}>{el.wonEmmy && '🏆'}</td>
                  <td key={i + 0.75}><button onClick={function(){deleteContact(i)}}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody> 
      </table>
    </div>
  );
}

export default App;
