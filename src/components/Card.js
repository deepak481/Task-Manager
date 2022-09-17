import { Button } from "@mui/material";
import React from "react";

function Card({ value, status, setTotalTasks, totalTasks, keysToSearch }) {
  let isKeyContain = false;
  isKeyContain = keysToSearch.some((element) => {
    if (value.indexOf(element) > -1) {
      return true;
    }
  });
  return (
    <div
      className="my-2 card d-flex flex-row px-2 justify-content-between"
      style={{
        backgroundColor: status ? "rgba(0, 123, 255, 0.25)" : "#eeeef3",
      }}
    >
      <div style={{ backgroundColor: isKeyContain ? "yellowgreen" : "" }}>
        {value}
      </div>
      <div>
        <Button
          onClick={
            () => {
              const updatedTasks = totalTasks
                ? Object.keys(totalTasks).map((task) => {
                    return totalTasks[task].task === value
                      ? { task: value, status: !totalTasks[task].status }
                      : totalTasks[task];
                  })
                : "";
              setTotalTasks([...updatedTasks]);
            }
            // })
          }
        >
          {status ? "ACTIVE" : "DONE"}
        </Button>
        <Button
          onClick={() => {
            const updatedTasks =
              totalTasks &&
              totalTasks.filter((task) => task && task.task !== value);
            console.log(updatedTasks);
            setTotalTasks([...updatedTasks]);
          }}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
}

export default Card;
