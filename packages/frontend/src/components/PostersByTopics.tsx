import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardByTopics from "./CardByTopics";

const NewPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #F5F5F5;
  padding-left: 50px;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const CustomSlider = styled(Slider)`
  background-color: rgba(145, 225, 254, 0.35);
  width: 100%;
  padding-top: 50px;
  height: 100%;
  .slick-next,
  .slick-prev {
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    line-height: 0;
    color: black;
  }

  .slick-dots {
    left: -33%;
  }
  
  .ft-slick__dots--custom {
    height: 6px;
    width: 85px;
    background-color: #EBEBEB;
    margin-top: 20px;
  }

  .slick-dots li {
    width: 85px;
  }

  .slick-dots .slick-active .ft-slick__dots--custom {
    background-color: #B588C1 !important;
  }
`

const TopicTitle = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 18px;
  align-self: flex-start;
  margin-top: 50px;
`;

const NewestPosters = [
  {
    topic: "World Justice",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster1.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice"],
        image: "assets/poster2.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation"],
        image: "assets/poster3.png"
      }
    ],
  },
  {
    topic: "Disinformation",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Unity"],
        image: "assets/poster4.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["Disinformation", "Change", "Unity"],
        image: "assets/poster5.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster6.png"
      }
    ]
  },
  {
    topic: "Change",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster1.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice"],
        image: "assets/poster2.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation"],
        image: "assets/poster3.png"
      }
    ]
  },
  {
    topic: "Unity",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Unity"],
        image: "assets/poster4.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["Disinformation", "Change", "Unity"],
        image: "assets/poster5.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster6.png"
      }
    ]
  },
  {
    topic: "Peace",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster1.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice"],
        image: "assets/poster2.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation"],
        image: "assets/poster3.png"
      },
    ]
  },
  {
    topic: "Life under water",
    posters: [
      {
        author: "Elvis Moss",
        title: "Era of Disinformation",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Unity"],
        image: "assets/poster4.png"
      },
      {
        author: "Alexander Rybin",
        title: "Unity and Peace",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["Disinformation", "Change", "Unity"],
        image: "assets/poster5.png"
      },
      {
        author: "Anna Apple",
        title: "Era of Disinformation in the new wild world",
        description: "2022, Spain / 423 u. printed in last 30 days",
        tags: ["World Justice", "Disinformation", "Change", "Unity"],
        image: "assets/poster6.png"
      }
    ]
  }
];

const PosterByTopics = () => {
  const [topic, setTopic] = useState(NewestPosters[0].topic);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current: any) => {
      setTopic(NewestPosters[current].topic);
    },
    customPaging: () => (
      <div className="ft-slick__dots--custom">
      </div>
    )
  };


  return (
    <NewPosterContainer>
      <Title>Posters by topics</Title>
      <CustomSlider {...settings}>
        {NewestPosters.map((posters, index) => {
          return (
            <div key={index}>
              <CardByTopics posters={posters.posters} />
            </div>
          )
        })}
      </CustomSlider>
      <TopicTitle>{topic}</TopicTitle>
    </NewPosterContainer>
  );
};

export default PosterByTopics;
