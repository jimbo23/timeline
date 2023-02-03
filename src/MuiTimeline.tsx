import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { useState } from 'react';
import { MySelect } from './MySelect';
import { data } from './data';
import { transform } from './transformer';

export default function MuiTimeline() {
  const [selected, setSelected] = useState('');

  const timelines = transform(data);

  // let selectedTimeline: TransformedData = timelines;
  let selectedTimeline = timelines;

  if (selected !== '') {
    // if selected is no longer an empty string, it means the LocationSelect is changed
    // then pls go and find the `row` index in the timeline
    // then update the `selectedTimeline` variable with the new value
    let row = selectedTimeline.findIndex(
      (timeline) =>
        timeline.designation === selected ||
        timeline?.opposite?.designation === selected
    );
    if (selected === selectedTimeline[row]?.opposite?.designation) {
      let temp = selectedTimeline[row];
      selectedTimeline[row] = selectedTimeline[row]?.opposite;
      selectedTimeline[row].opposite = temp;
    }
    selectedTimeline = timelines.slice(row, timelines.length);
  }

  return (
    <>
      <MySelect selected={selected} setSelected={setSelected} />
      <Timeline>
        {selectedTimeline.map((timeline, idx) => (
          <TimelineItem key={timeline.designation}>
            <TimelineOppositeContent>
              {timeline.opposite && (
                <>
                  <div>
                    {timeline.date} {timeline.opposite.time}
                  </div>
                  <div>Unit Received: {timeline.opposite.transferQty}</div>
                  <div>Arrived At {timeline.opposite.designation}</div>
                </>
              )}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {idx !== selectedTimeline.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <div>
                {timeline.date} {timeline.time}
              </div>
              <div>Unit Received: {timeline.transferQty}</div>
              <div>Arrived At {timeline.designation}</div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
