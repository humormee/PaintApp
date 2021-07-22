import { connect } from 'react-redux';
import PaintingShow from './painting_show';
import { fetchPainting, fetchPaintings, fetchArtist} from '../../actions/painting_actions';

const mSTP = (state, props) => {
  const paintArray = state.entities.paintings.all;
  let painting;
  
  for (let i = 0; i < paintArray.length; i++) {
    if ( paintArray[i]._id === props.match.params.id ) {
      painting = paintArray[i]
    } 
  }
  return {
    painting: painting,
    entities: state.entities
  }
};

const mDTP = dispatch => {
  
  return {
    fetchArtist: id => dispatch(fetchArtist(id)),
    fetchPainting: id => dispatch(fetchPainting(id)),
    fetchPaintings: () => dispatch(fetchPaintings())
  }
}

export default connect(mSTP, mDTP)(PaintingShow)