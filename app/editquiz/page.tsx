import styles from "../../styles/editquiz.module.css";
import { Slider } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";

export default function EditQuizPage() {

    return(
        <section className={styles.editquiz}>
            <div>
                <TextField
                    id="filled-basic"
                    label="Quiz Title"
                    maxRows={4}
                    variant="filled"
                    style={{ width: "400px" }}
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
                        max={15}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>
            </div>
        </section>
    );
}