import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap';
import Car from "../../assets/image/service.png";
import { getImageUrl } from '../../services/contentApi';

const CarRepair = ({ content = null }) => {
  // Get car repair content from props or use defaults
  const carRepair = content?.carRepair || {
    image: Car,
    title: 'Car Repairing, Made Simple to Learn',
    description: 'You don\'t need to be a mechanic to learn car repairs. From oil changes to engine basics, we break it down so anyone can learn. Whether you\'re a curious beginner or want to go pro, our workshops are where you start.'
  };

  return (
    <>
      <div className="make_easy_sec about_sec" id='carrepair'>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about_info">
                <div className="about_img car_services">
                  <img 
                    src={getImageUrl(carRepair.image, Car)}
                    alt="" 
                  />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about_details">
                <h2>{carRepair.title || 'Car Repairing, Made Simple to Learn'}</h2>
                <p>{carRepair.description || 'You don\'t need to be a mechanic to learn car repairs. From oil changes to engine basics, we break it down so anyone can learn. Whether you\'re a curious beginner or want to go pro, our workshops are where you start.'}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CarRepair
