"use client";

import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import styles from "../../styles/createquiz.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import Link from "next/link";
import jsonData from "./savedpdfoutput.json";
import OpenAI from "openai";
import setQuizzes from "./dashboard/page.tsx";
import Quizzes from "./dashboard/page.tsx";
import { useThemContext } from "../theme-provider";

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState(""); // State variable for quiz title
  const [quizContent, setQuizContent] = useState("");
  const numQuestionsRef = useRef(1); // Using useRef to hold a numeric value, if needed
  const [numQuestions, setNumQuestions] = useState(1); // Using useState for re-render
  const [modalActive, setModalActive] = useState(false); // Using useState for re-render
  const [gradelevel, setGradeLevel] = useState("");

  const theme = useThemContext();
  theme.setTitle("Create Quiz");

  const handleChange = (event: SelectChangeEvent) => {
    setGradeLevel(event.target.value);
  };

  const handleQuizTitleChange = (event) => {
    setQuizTitle(event.target.value); // Update quiz title state
  };

  const handleQuizContentChange = (event) => {
    setQuizContent(event.target.value); // Update quiz content state
  };

  const handleSliderChange = (event, newValue) => {
    numQuestionsRef.current = newValue;
    setNumQuestions(newValue);
  };

  // Function to provide accessible text for the slider's current value
  const getAriaValueText = (value) =>
    `${value} question${value > 1 ? "s" : ""}`;

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  function createNewQuiz() {
    const cardContent = {
      quizName: quizTitle,
      numQuestions: numQuestions,
      gradeLevel: gradelevel,
      date: "2/11/2024",
    };

    theme.setQuizName(quizTitle);
    theme.setNumQuestions(numQuestions);
    console.log(theme.quizzes);

    theme.setQuizzes([...theme.quizzes, cardContent]);
  }

  function toggleModal() {
    setModalActive(!modalActive);
  }

  const handleCalculate = () => {
    axios
      .post(
        "your_openai_api_endpoint",
        {
          prompt: "2+2=",
          max_tokens: 1,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setCalculationResult(response.data.choices[0].text);
      })
      .catch((error) => {
        console.error("Error fetching calculation:", error);
      });
  };

  return (
    <section className={styles.createquiz}>
      <div
        className={`${styles.modalbackdrop} ${
          modalActive ? styles.active : ""
        }`}
        onClick={toggleModal}
      >
        <div className={styles.loadingimage}>
          <img src="/lightbulboff.png" alt="EduCraft Logo" />
        </div>

        <div className={styles.loadingimage}>
          <img
            className={styles.lightbulbon}
            src="/lightbulbon.png"
            alt="EduCraft Logo"
          />
        </div>

        <div className={styles.quizreadytext}>
          <Link href="/takequiz">
            <button className={`${styles.button66} ${styles.takequizbutton}`}>
              Take Quiz
            </button>
          </Link>
          <button className={`${styles.button66} ${styles.editbutton}`}>
              Edit Quiz
            </button>
        </div>
      </div>
      <div>
        <TextField
          id="filled-basic"
          label="Quiz Title"
          maxRows={4}
          variant="filled"
          style={{ width: "400px" }}
          value={quizTitle} // Bind value to quizTitle state
          onChange={handleQuizTitleChange} // Handle change event
        />
      </div>

      <div className={styles.numberofQuestions}>
        <h4> Number of Questions</h4>
        <div className={styles.sliderDiv}>
          <Slider
            aria-label="Number of Questions"
            defaultValue={1}
            value={numQuestions} // Controlled component
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </div>
      </div>
      <div>
        <FormControl variant="filled" sx={{ minWidth: 150 }}>
          <InputLabel id="simple-select-filled-label">Grade Level</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={gradelevel}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Elementary"}>K-5</MenuItem>
            <MenuItem value={"Middle School"}>6-8</MenuItem>
            <MenuItem value={"High School"}>9-12</MenuItem>
            <MenuItem value={"College"}>College</MenuItem>
          </Select>
        </FormControl>
      </div>
      <UploadFile setQuizContent={setQuizContent} />
      <div className={styles.fileupload}>
        {/* <button className={styles.selectbutton}> Select File</button>\ */}
        <TextField
          id="filled-textarea"
          label="Quiz Content"
          placeholder="Placeholder"
          multiline
          minRows={10}
          variant="filled"
          style={{ width: "600px" }}
          value={quizContent} // Bind value to quizContent state
          onChange={handleQuizContentChange} // Handle change event
        />
      </div>

      <div>
        <button
          className={styles.button66}
          onClick={() => {
            toggleModal();
            createNewQuiz();
          }}
        >
          Generate Quiz
        </button>
      </div>
    </section>
  );
}

function UploadFile({ setQuizContent }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileContent, setFileContent] = useState(""); // State to hold the file content

  if (selectedFile !== null) {
    console.log("File selected");
    setQuizContent(`HACKER PACKET
    Find out all the information you should know before
    attending CodeRED Genesis at the University of Houston.
    
    F E B . 1 0 - 1 1 S T U D E N T C E N T E R S O U T H , H O U S T O N R O O M
    CODERED GENESIS TABLE OF CONTENTS
    TABLE OF CONTENTS
    01 EVENT SCHEDULE
    03 VENUE & PARKING
    06 DISCORD USAGE & COMMANDS
    08 WORKSHOPS & SIDE EVENTS
    10 JUDGING
    11 PRIZES
    12 F.A.Q. (Frequently Asked Questions) & SPONSORS
    CODERED GENESIS DAY 1 SCHEDULE
    SCHEDULE
    DAY 1 - FEB. 10TH (SATURDAY)
    9:30 AM — 11 AM Check-In + Networking W/ Reps
    Outside Houston Room (220)
    After 11 AM, Hackers that have not checked in will have their place forfeited, and
    people in the waitlist will now be accepted,
    11 AM — 1 PM Opening Ceremony
    Houston Room (220)
    1 PM Hacking Begins + Lunch
    Bánh Mì From B&T
    2 PM ConocoPhillips Info. Session
    3 PM Typing Competition
    4 PM PROS Workshop
    6 PM Dinner
    Pizza From Domino’s
    9 PM Cut-Off Time to Leave Venue
    7 PM CodeRED/CougarCS Kahoot!
    10 PM Ultimate Rock-Paper-Scissors!
    All Times CST (UTC-6)
    NEXT UP: DAY 2 SCHEDULE 01
    CODERED GENESIS DAY 2 SCHEDULE
    SCHEDULE
    All Times CST (UTC-6)
    DAY 2 - FEB. 11TH (SUNDAY)
    12 AM Painting With Hackers
    8 AM Doors Reopen + Breakfast
    Donuts, & Kolaches From Shipley’s
    12 PM Lunch
    Wraps From Salad And Go
    1 PM Hacking Stops
    1:15 PM Judging Begins
    3 PM Closing Ceremony
    Houston Room (220)
    4:30 PM Check-Out
    — END OF EVENT —
    PREVIOUSLY: DAY 1 SCHEDULE NEXT UP: VENUE 02
    CODERED GENESIS VENUE
    VENUE
    CodeRED Genesis will be held in the Houston Room,
    
    inside of Student Center South on the 2nd Floor
    Address: 4455 University Dr. Houston, TX 77204
    MAP OF 2ND FLOOR, STUDENT CENTER SOUTH
    HOUSTON ROOM
    (220)
    PREVIOUSLY: SCHEDULE NEXT UP: INSIDE THE VENUE 03
    CODERED GENESIS VENUE
    INSIDE THE VENUE
    Inside the Houston Room, there are
    The Main and Side Exits will ALWAYS
    
    be available if any emergency occurs.
    2
    6
    2
     Main Entrances/Exits
    
     Side Exits
    
     Back Exits
    FLOOR PLAN OF THE HOUSTON ROOM
    
    W/ EXITS AND ENTRANCES MARKED
    PREVIOUSLY: VENUE BUILDING FLOOR PLAN NEXT UP: PARKING 04
    CODERED GENESIS PARKING
    PARKING
    If you are a UH Student with a VALID Parking Permit:
    If you are a Non-UH Student:
    Please be aware about overnight parking.
    (For both UH and Non-UH Students)
    You may NOT park
    
    in Lot 19D or 21B in Zone C and 5C, 5D, 5E, and 6C in Zone D.
    
    FOR MORE PARKING INFORMATION, 
    
    PLEASE VISIT UH.EDU/PARKING
    You may park in spaces that have in effect. Relaxed Parking Rules
    You may park in the Elgin Garage, Welcome Center
    Visitor Garage, East Garage or Stadium Garage,
    as well as any Zones for $20 Visitor Parking.
    *TO SEE ALL PARKING MAPS, VISIT https ://u h.ed u/pa r king/pa r king - o n- ca mpu s/ma ps/
    Welcome Center
     Garage
    Student Center
    
    South
    East
     Garage
    Stadiu
    Garagem
    
    CodeRED Genesis Venue
    PREVIOUSLY: VENUE NEXT UP: DISCORD USAGE 05
    CODERED GENESIS DISCORD USAGE
    DISCORD USAGE
    The Discord Server will be your biggest
    
    Go-To for the ENTIRETY of the Hackathon.
    Through the server, you can:
    Form Teams
    Find the Event Schedule
    Find overviews of the Challenges and
    
    Side Quests
    Ask Mentors for help on your project
    Judge other Hacker’s Side Event
    
    Submissions
    Send reports to our Officer Team for
    
    Emergencies & Issues
    Get notified for all updates and information
    
    about CodeRED Genesis
    PREVIOUSLY: PARKING NEXT UP: DISCORD BOT COMMANDS 06
    /Create_team
    
    Creates a new role and channel for your Hackathon Team.
    
    You can also set the HEX Value Color.
    /Verify
    
    Verifies your registration prior to CodeRED Genesis.
    /Invite
    
    Allows you to send an invite for your team, to another Hacker.
    /Promote
    
    Sends a promotion message to allow any Hacker to join 
    
    your team.
    /Leave_team
    
    Removes you from your current team. If you are the last
    
    member, then the team will be permanently deleted.
    /Report
    
    Lets you send a report to the CodeRED Officer Team for
    
    emergencies or other critical issues.
    /Rename_team
    
    Allows you to rename your CodeRED Genesis team.
    DISCORD BOT COMMANDS
    CODERED GENESIS DISCORD COMMANDS
    PREVIOUSLY: DISCORD USAGE NEXT UP: WORKSHOPS 07
    CODERED GENESIS WORKSHOPS
    WORKSHOPS
    SCHEDULE
    Along with Side Events, CodeRED Genesis will
    
    also have some Workshops for Hackers to
    
    participate in. Level up your skills for your project!
    SATURDAY, FEB 10TH
    2:00 PM ConocoPhillips Info. Session
    4:00 PM PROS Workshop
    PREVIOUSLY: DISCORD USAGE & COMMANDS NEXT UP: SIDE EVENTS 08
    CODERED GENESIS SIDE EVENTS
    SIDE EVENTS
    We will have Side Events with many prizes for
    Hackers to take part in, relaxing and kicking back!
    ALL Side Events will take place on
    
    February 10th.
    NEXT UP: JUDGING 09
    3:00 PM Typing Competition
    12:00 AM Painting with Hackers
    10:00 PM Ultimate Rock-Paper-Scissors!
    7:00 PM CodeRED/CougarCS Kahoot
    PREVIOUSLY: WORKSHOPS
    CODERED GENESIS JUDGING
    JUDGING
    The judges will begin going through all of the
    
    projects by visiting each group at their station.
    
    The scoring will be anonymous.
    CodeRED will have judging begin promptly
    
    at 1:15 PM on Sunday, February 11th.
    There will be 5 categories from which
    
    candidates will be judged.
    Uniqueness
    
    Functionality
    
    Practicality
    
    Creativity 
    Aesthetic
    PREVIOUSLY: SIDE EVENTS NEXT UP: PRIZES 10
    CODERED GENESIS
    PRIZES
    1 Prize Per Winning Team Member
    PRIZES
    Missions
    Track
    1st Place M5 Sony Headphones
    2nd Place 180Hz Gaming Monitor
    3rd Place Anker Portable Battery
    1st Place Nintendo Switch
    2nd Place Razer Viper V2 Pro
    3rd Place Razer Kiyo Pro Webcam
    General Track
    1st Place Portable Monitor w/ 
     Battery Pack
    2nd Place PROS Goodie Bag
    3rd Place Bluetooth Speaker
    Track
    HyperX Microphone
    Best Design
    iPad (9th Generation)
    Most Innovative Idea
    Raspberry Pi (8 GB)
    Best AI Usage
    PREVIOUSLY: JUDGING NEXT UP: F.A.Q. 11
    CODERED GENESIS F.A.Q. (FREQUENTLY ASKED QUESTIONS)
    12
    F.A.Q.
    PREVIOUSLY: PRIZES
    Are we allowed to leave the venue after Check-In?
    Yes, you are able to leave, but your presence is required for judging and the
    closing ceremony. You are free to go to other places off-campus after
    check-in to hack, but you will be unable to attend workshops and side
    events as they are in-person only.
    Will food be provided at the event?
    Yes, we will be providing free food for all participants, this will include 1
    Breakfast, 2 Lunches, & 1 Dinner, alongside snacks and drinks to keep you
    energized throughout the event!
    Am I allowed to bring outside food in?
    Yes, you’re allowed to bring snacks, drinks, and food if we do not cater to
    your dietary needs. We will have vegetarian options available for hackers
    to pick from.
    Do I have to stay overnight for the event?
    No, you are free to leave the venue grounds, and return the following day.
    There is a cut-off time to leave the venue before the doors lock at 9 PM on
    February 10th. Doors open back up at 8 AM on February 11th.
    How much does it cost to attend?
    The event is entirely free. Simply register, show up, & you are good to go!
    S P O N S O R E D B Y`);
  }

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div style={{ color: "black" }}>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate &&
              selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} style={{ color: "black" }} />
      {fileData()}
    </div>
  );
}
