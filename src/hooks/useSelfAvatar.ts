import {useSelector} from 'react-redux';

import DefaultAvatar from 'assets/default-avatar.svg';
import {getSelf} from 'selectors/state';

const useSelfAvatar = (): string => {
  const self = useSelector(getSelf);

  return self.avatar || DefaultAvatar;
};

export default useSelfAvatar;
