import React, { useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { formatTimeAndMinutes } from '../../../../../utils/functions';
import { useCreateNoteMutation, useUpdateLessonDoneByUserMutation } from '../../../client.service';
import { setPercentHavePlayed, updateLessonDoneAtBrowser } from '../../../client.slice';
import AddNoteDrawer from './components/AddNotesDrawer';
import { useSearchParams } from 'react-router-dom';

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.client.playingVideo);
  const currUserId = useSelector((state: RootState) => state.auth.userId);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const percentHavePlayed = useSelector((state: RootState) => state.client.percentHavePlayed);

  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [noteContent, setNoteContent] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [updateLessonDone] = useUpdateLessonDoneByUserMutation();
  const [apiCalled, setApiCalled] = useState(false);

  const playerEl = useRef<ReactPlayer>(null);

  const showDrawer = () => {
    setIsPlaying(false);
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
    setIsPlaying(true);
  };

  const handleSubmitNote = async () => {
    if (!noteContent.trim()) {
      notification.error({
        message: 'Error',
        description: 'Notes cannot be empty'
      });
      return;
    }
    const currentTimeInSeconds = playerEl.current ? playerEl.current.getCurrentTime() : 0;

    try {
      await createNote({
        userId: currUserId,
        lessonId: currLessonId,
        content: noteContent,
        courseId: courseId as string,
        videoMinute: Math.floor(currentTimeInSeconds) 
      }).unwrap();
      notification.success({
        message: 'Success',
        description: 'Note has been added'
      });
      setNoteContent('');
      onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Can\'t save notes'
      });
    }
  };

  useEffect(() => {
    if (playerEl.current) {
      const playedTime = percentHavePlayed * playerEl.current.getDuration();
      setFormattedTime(formatTimeAndMinutes(playedTime));
    }
  }, [percentHavePlayed]);

  const onProgress = () => {
    if (!apiCalled && playerEl.current) {
      const percent = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
      dispatch(setPercentHavePlayed(percent));

      if (percent >= 0.95 && !apiCalled) {
        dispatch(updateLessonDoneAtBrowser(currLessonId));
        updateLessonDone({
          userId: currUserId,
          lessonId: currLessonId
        })
          .then(() => {
            notification.success({
              message: 'Video Completed',
              description: 'You have finished watching this video'
            });
            setApiCalled(true);
          })
          .catch((error) => {
            console.error('Error while updating the lesson progress', error);
          });
      }
    }
  };

  // Reset API called flag when lesson changes
  useEffect(() => {
    setApiCalled(false);
  }, [currLessonId]);

  return (
    <>
      <ReactPlayer
        ref={playerEl}
        className='player-screen'
        url={content}
        width='100%'
        height='90vh'
        controls={true}
        playing={isPlaying}
        onProgress={onProgress}
      />
      <div className='notes-section'>
        <button
          className='ml-4 mt-4 mb-4 flex items-center bg-red-500 text-white px-6 py-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50'
          onClick={showDrawer}
        >
          <span>Add notes at: {formattedTime}</span>
        </button>
      </div>
      <AddNoteDrawer
        currLessonId={currLessonId}
        visible={drawerVisible}
        onClose={onClose}
        noteContent={noteContent}
        formattedTime={formattedTime}
        setNoteContent={setNoteContent}
        onSubmitNote={handleSubmitNote}
        isLoading={isLoading}
      />
    </>
  );
};

export default PlayerScreen;
