import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'
// import Button from '@mui/material'
// @import 'node_modules/react-modal-video/scss/modal-video.scss';
import { Box } from "@mui/system";
// import 'node_modules/react-modal-video/scss/modal-video.scss';
// import {VideoCard} from "material-ui-player"
// import IconButton from '@material-ui/core/IconButton';
const Youtube = () => {

	const [isOpen, setOpen] = useState(false)

	return (
		// <Box sx={{height:"100vh", width:"auto", display:"flex", alignItems:"center"}}>
		<React.Fragment>
			<ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" playsinline={1} onClose={() => setOpen(false)} />

			<button className="btn-primary" onClick={()=> setOpen(true)}>VIEW DEMO</button>
		</React.Fragment>
		// </Box>
	)
}

// using Iframe

// const Youtube =() => {
// 	return(
// 		<>
// 		<iframe id="ytplayer" type="text/html" width="640" height="360"
//   src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
//   frameborder="0"></iframe>
// 		</>
// 	)
// }

// using mui react model

// const Youtube =() => {
// 	return(
// 		<>
// 		<Box>
// 			<VideoCard src={"https://youtu.be/O23IgS5J3uA"}></VideoCard>
// 		</Box>
// 		</>
// 	)
// }

// using model and i Frame

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// const style = {
//   display: "flex",
//   alignContents: "center",
//   position: "absolute",
//   width: "100%",
//   height: "100%",
//   justifyContent: "center",
//   alignItems: "center",
// };

// function Youtube() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <iframe
//             width="960"
//             height="540"
//             title="Player for Avesha Application Slice HD"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             src="https://www.youtube-nocookie.com/embed/O23IgS5J3uA"
// 			id="O23IgS5J3uA"
//           ></iframe>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// USing Video Tag

// function Youtube() {
//   return (
//     <>
//       <Box sx={{ border: "solid black 2px" }}>
//         <Box></Box>
//         <Box>
//           <iframe
//             id="youtube-9518"
//             frameborder="0"
//             allowfullscreen="1"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             title="Player for Avesha Application Slice HD"
//             width="640"
//             height="360"
//             src="https://www.youtube.com/embed/O23IgS5J3uA?autoplay=0&amp;
// 			controls=1&amp;
// 			disablekb=1&amp;playsinline=1&amp;cc_load_policy=1&amp;cc_lang_pref=auto&amp;widget_referrer=https%3A%2F%2Favesha.io%2F&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;customControls=true&amp;noCookie=false&amp;enablejsapi=1&amp;origin=https%3A%2F%2Favesha.io&amp;widgetid=1"
//             data-gtm-yt-inspected-9="true"
//           ></iframe>
//         </Box>
//       </Box>
//     </>
//   );
// }

export default Youtube;
