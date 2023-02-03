import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { useQueryState } from './use-query-state';
import { MySelect } from './MySelect';
import { data } from './data';
import { transform } from './transformer';

export default function MuiTimeline() {
  const [selected, setSelected] = useQueryState('location');

  const timelines = transform(data);

  // let selectedTimeline: TransformedData = timelines;
  let selectedTimeline = timelines;

  if (selected) {
    // if selected is not null or not undefined or not empty string, it means the LocationSelect is changed
    // then pls go and find the `row` index in the timeline
    let row = selectedTimeline.findIndex(
      (timeline) =>
        timeline.designation === selected ||
        timeline?.opposite?.find((i) => i.designation === selected)
    );

    const foundItem = selectedTimeline[row].opposite.find(
      (i) => i.designation === selected
    );

    if (foundItem) {
      let temp = selectedTimeline[row];
      selectedTimeline[row] = {
        ...foundItem,
        opposite: [
          ...temp.opposite.filter((i) => i.designation !== selected),
          {
            date: temp.date,
            designation: temp.designation,
            senderDesignation: temp.senderDesignation,
            time: temp.time,
            transferQty: temp.transferQty,
          },
        ],
      };
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
              {timeline.opposite.length > 0 &&
                timeline.opposite.map((i) => (
                  <div key={i.designation}>Arrived At {i.designation}</div>
                ))}
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
      <pre>
        <code>{JSON.stringify(selectedTimeline, null, 2)}</code>
      </pre>
    </>
  );
}
