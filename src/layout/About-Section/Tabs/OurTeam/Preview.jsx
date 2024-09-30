import TeamCardComponent from 'components/cards/TeamCardComponent';
import MainCard from 'components/MainCard';
import useOurTeamHook from 'hooks/OurTeamHook';
import React from 'react';

function Preview() {
  const { initialValues } = useOurTeamHook();
  return (
    <MainCard title="Preview Section" darkTitle>
      <TeamCardComponent
        name={initialValues?.fullname}
        position={initialValues?.position}
        message={initialValues?.message}
        avatar={initialValues?.avatar_preview}
      />
    </MainCard>
  );
}

export default Preview;
