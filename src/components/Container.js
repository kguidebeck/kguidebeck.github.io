import styled from 'styled-components';
import screen from 'superior-mq';
import { bp } from '../styles/helpers';

const Container = styled.div`
  max-width: 1340px;
  margin: auto;

  ${screen.below(bp.desktop, `
    max-width: 1200px;
  `)}

  ${screen.below(bp.desktopSm, `
    max-width: 1080px;
  `)}

  ${screen.below(bp.laptopSm, `
    max-width: 960px;
  `)}

  ${screen.below(bp.tablet, `
    max-width: 800px;
  `)}

  ${screen.below(bp.tablet, `
    max-width: 800px;
  `)}

  ${screen.below(bp.portrait, `
    padding: 0 40px;
  `)}

  ${screen.below(bp.mobile, `
    padding: 0 15px;
  `)}
`;

export default Container;
