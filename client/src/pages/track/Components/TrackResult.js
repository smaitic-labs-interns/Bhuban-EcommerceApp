import React from "react";
import {
  TrackResultWrapper,
  ResultTitle,
  TrackResultContent,
} from "../styles/trackResultStyle";

export default function TrackResult({ result }) {
  return (
    <TrackResultWrapper>
      <ResultTitle>
        Your <span>{result.track} </span>search result:
      </ResultTitle>
      <TrackResultContent>
        Type: <span>{result.type}</span>
      </TrackResultContent>
      <TrackResultContent>
        Status: <span>{result.status}</span>
      </TrackResultContent>
    </TrackResultWrapper>
  );
}
