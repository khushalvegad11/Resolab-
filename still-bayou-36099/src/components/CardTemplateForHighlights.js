import React from 'react';
import Image from 'react-bootstrap/Image';

import '../style/css/CardTemplate.min.css';

function CardTemplate(props) {
		
		
		var card=(
			<div className="highlights fill b-dark">
				<Image style={{border: '1px solid black'}} src={require(`../images/highlights/${props.cStat}.png`)} />		
			</div>
			);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default CardTemplate;