import styles from "../styles/Frame.module.css";
import Presentation from "./Presentation";
import Experience from "./Experience";
import { useState } from "react";
import Prevew from "./Preview";

const initExperience = (id) => ({
  headline: "",
  startTime: "",
  endTime: "",
  description: "",
  id: id,
});

export default function Frame() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postalcode: "",
    city: "",
    phone: "",
    github: "",
    linkedin: "",
    website: "",
  });

  const [experiences, setExperiences] = useState([initExperience(0)]);

  const [selectedImage, setSelectedImage] = useState();

  const [isShow, setIsShow] = useState(true);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage({
        src: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleClick = (e) => {
    setIsShow(!isShow);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleExperienceChange = (e, id) => {
    const name = e.target.name;

    const value = e.target.value;
    const newState = experiences.map((exp, index) => {
      if (index == id) {
        return {
          ...exp,
          [name]: value,
        };
      } else {
        return exp;
      }
    });

    setExperiences(newState);
  };

  const addExperience = () => {
    const id = Math.max(...experiences.map((i) => i.id));
    setExperiences([...experiences, initExperience(id + 1)]);
  };

  const removeExperience = (id) => {
    let val = experiences.filter((e) => id !== e.id);

    setExperiences(val);
  };

  return (
    <>
      <div className={styles.container}>
        {isShow ? (
          <div className={styles.frame}>
            <h1>Ready to Create Your Resume?</h1>

            <Presentation
              state={state}
              handleChange={handleChange}
              imageChange={imageChange}
              setSelectedImage={setSelectedImage}
            />
            <h1>Experiences</h1>
            <p>Here you can add your work/educational experiences</p>
            {experiences.map((experience) => (
              <Experience
                key={experience.id}
                id={experience.id}
                experience={experience}
                experiences={experiences}
                setExperiences={setExperiences}
                removeExperience={removeExperience}
                handleExperienceChange={(e) =>
                  handleExperienceChange(e, experience.id)
                }
                addExperience={addExperience}
              />
            ))}
          </div>
        ) : (
          <Prevew
            state={state}
            selectedImage={selectedImage}
            experiences={experiences}
          />
        )}
        <button onClick={handleClick} className={styles.previewBtn}>
          Preview/workmode
        </button>
      </div>
    </>
  );
}
