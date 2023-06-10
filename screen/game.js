import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { ProgressBar, MD3Colors } from 'react-native-paper';


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      lastlin: null,
      lastcol: null,
      score: 50,
      totalscore:0,
      level:1,
      progress: 0.50,
      name:"",
      pause:false

    }
  }



  componentDidMount() {
    this.setState({name:this.props.route.params.name}) ;
    var grd = [];

    for (let i = 0; i < 8; i++) {
      grd[i] = [];
      for (let j = 0; j < 8; j++) {
        grd[i][j] = this.randomnum(5);
      }
      while (this.checkend(grd) == false) {
        this.checklines(grd);
      }
    }
    this.timescore();
    this.setState({ grid: grd });
  }



  randomnum(max) {
    return Math.floor(Math.random() * max + 1);
  }



  isdiagonal(l1, c1, l2, c2) {
    const rowDiff = Math.abs(l1 - l2);
    const colDiff = Math.abs(c1 - c2);
    return rowDiff === colDiff;
  }



  cswitch(l1, c1, l2, c2) {

    if ((l1 == l2 + 1 || l1 == l2 - 1 || l1 == l2) && (c1 == c2 + 1 || c1 == c2 - 1 || c1 == c2)) {


      if (!(this.isdiagonal(l1, c1, l2, c2))) {

        let ngrid = this.state.grid;
        let arr = JSON.parse(JSON.stringify({ ngrid }));
        let prevstate = arr;

        tval = arr.ngrid[l1][c1];
        arr.ngrid[l1][c1] = arr.ngrid[l2][c2];
        arr.ngrid[l2][c2] = tval;

        if (this.checkend(arr.ngrid) == true) {
          this.checklines(ngrid);
        } else {
          tval = ngrid[l1][c1];
          ngrid[l1][c1] = ngrid[l2][c2];
          ngrid[l2][c2] = tval;
        }

        while (this.checkend(ngrid) == false) {
          this.checklines(ngrid);
        }
      }
    }
    this.setState({ lastlin: null })
    this.setState({ lastcol: null })
  }



  checklines(g) {
    let ngrid = g;
    let count = 1;
    let indl = [];
    let points = 0;

    for (let li = 0; li < ngrid.length; li++) {
      count = 1;
      for (let col = 1; col < ngrid.length; col++) {
        if (ngrid[li][col] === ngrid[li][col - 1]) {
          count++;
          if (col == 7 && count >= 3) {
            points += count * 5;
            for (let g = 0; g < count; g++) {
              indl.push([li, col - g]);
            }
          }
        }
        else if (count >= 3) {
          points += count * 5;
          for (let g = 1; g < count + 1; g++) {
            indl.push([li, col - g]);
          }
          count = 1;
        }
        else {
          count = 1;
        }
      }
    }
    this.checkcol(ngrid, indl, points)

  }



  checkcol(g, tg, p) {
    let ngrid = g;
    let count = 1;
    let indl = tg;
    let indc = []
    let points = p;


    for (let li = 0; li < ngrid.length; li++) {
      count = 1;
      for (let col = 1; col < ngrid.length; col++) {
        if (ngrid[col][li] === ngrid[col - 1][li]) {
          count++;
          if (col == 7 && count >= 3) {
            for (let g = 0; g < count; g++) {
              points += count * 5;
              indc.push([col - g, li]);
            }
          }
        }
        else if (count >= 3) {
          points += count * 5;
          for (let g = 1; g < count + 1; g++) {
            indc.push([col - g, li]);
          }
          count = 1;
        }
        else {
          count = 1;
        }
      }
    }

    this.setState({ score: (this.state.score + points) });
    this.setState({ totalscore: (this.state.totalscore + points) });
    if (points > 0) {
      this.transform(ngrid, indc, indl);
    }
  }

  transform(g, lig, cig) {
    let ngrid = g;
    let lind = lig;
    let cind = cig

    for (let i = 0; i < lind.length; i++) {
      ngrid[lind[i][0]][lind[i][1]] = 0;
    }
    for (let i = 0; i < cind.length; i++) {
      ngrid[cind[i][0]][cind[i][1]] = 0;
    }
    this.replace(ngrid);
  }



  replace(g) {
    let garr = g;
    let szero = true;
    while (szero) {
      szero = false;
      for (let i = 0; i < garr.length; i++) {
        for (let j = 0; j < garr.length; j++) {
          if (garr[j][i] === 0) {
            let kl = j;
            while (kl > 0 && garr[kl - 1][i] === 0) {
              kl--;
            }
            if (kl === 0) {
              garr[j][i] = this.randomnum(5);
            } else {
              garr[j][i] = garr[kl - 1][i];
              garr[kl - 1][i] = 0;
            }
            szero = true;
          }
        }
      }
    }
    this.calcprog();
    return garr;
  }



  cpress(l, c) {
    if(this.state.pause){
      return;
    }
    if (this.state.lastlin == null) {
      this.setState({ lastlin: l })
      this.setState({ lastcol: c })
    } else {
      this.cswitch(l, c, this.state.lastlin, this.state.lastcol)
    }
  }


  checkend(g) {
    let ngrid = g;
    for (let li = 0; li < ngrid.length; li++) {
      count = 1;
      for (let col = 1; col < ngrid.length; col++) {
        if (ngrid[li][col] === ngrid[li][col - 1]) {
          count++;
          if (col == 7 && count >= 3) {
            return false;
          }
        }
        else if (count >= 3) {
          return false;
          count = 1;
        }
        else {
          count = 1;
        }

      }

    }

    for (let li = 0; li < ngrid.length; li++) {
      count = 1;
      for (let col = 1; col < ngrid.length; col++) {
        if (ngrid[col][li] === ngrid[col - 1][li]) {
          count++;
          if (col == 7 && count >= 3) {
            return false;
          }
        }
        else if (count >= 3) {
          return false;
          count = 1;
        }
        else {
          count = 1;
        }
      }
    }
    return true;
  }


  calcprog() {
    let val = this.state.score / 100;
    this.setState({ progress: val });
  }


  timescore() {
    if(this.state.pause == false){
    let multiplier = this.state.level * 1;
    if(this.state.score>=100){
      this.setState({score:50});
      this.setState({level:this.state.level+1});
      multiplier++;
    }else if(this.state.score<=0){
      this.gameover();
      return;
    } 
    let scorecalc = (this.state.score - (3+multiplier));
    this.setState({ score:scorecalc})
    this.calcprog();
  }

    setTimeout(() => {
      this.timescore();
    }, 3000);
  }

  test(){
    this.gameover();
  }

gameover(){
  const { navigate } = this.props.navigation;
  this.postscore();
  navigate("Gameover",{name:this.state.name, score:this.state.totalscore})
}

postscore(){
  const formdata = new FormData;
  formdata.append("name",this.state.name);
  formdata.append("score", this.state.totalscore);
  console.log(formdata);
  fetch('http://jdevalik.fr/api/bejscore.php',{
    method: 'POST',
    body:formdata,
    headers:{
      "Content-Type":"multipart/form-data"}
  })
}

pause(){
this.state.pause ? this.setState({pause:false}) : this.setState({pause:true});
}


  render() {
    
    const { navigate } = this.props.navigation;
    
    return (

      <View style={styles.container}>
        <ImageBackground source={require('../assets/gamebg.webp')} resizeMode="cover" style={styles.image}>
          <View style={styles.container2}>

            <View style={styles.info}>
          <Text style={styles.level}>Niveau :{this.state.level}</Text>
          <Text style={styles.score}>Score :{this.state.totalscore}</Text>
          </View>
<View style={styles.background}>
        {this.state.grid.map((ligne, Ligne) => (
          <View style={styles.row} key={Ligne}>
            {ligne.map((valeur, Col) => {
              var block;
              if(this.state.pause == false){
              switch (valeur) {
                case 1: block = <Image style={styles.blocks} source={require('../assets/block1.jpg')} />; break;
                case 2: block = <Image style={styles.blocks} source={require('../assets/block2.png')} />; break;
                case 3: block = <Image style={styles.blocks} source={require('../assets/block3.jpg')} />; break;
                case 4: block = <Image style={styles.blocks} source={require('../assets/block4.jpg')} />; break;
                case 5: block = <Image style={styles.blocks} source={require('../assets/block5.jpg')} />; break;
              }}else{
                block = <Image style={styles.blocks} source={require('../assets/pauseblock.png')} />;
              }
              return (

                <TouchableOpacity style={styles.touch} onPress={() => this.cpress(Ligne, Col)}>

                  <View style={styles.cell} key={Col}>

                    {block}

                  </View>

                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        </View>
        <View style={{ height: 20 }} />
        <ProgressBar style={styles.progress} progress={this.state.progress} color={MD3Colors.error50} indeterminate={false} />
        <Button style={styles.pause} onPress={() => this.pause()}>Pause</Button>
        </View>
        </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  info:{
    backgroundColor:"rgba(0, 0, 0, 0.5)",
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    marginBottom:10
  },
  level:{
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
background:{
  backgroundColor:"white"
},

  score:{
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cellText: {
    fontSize: 18,
  },

  touch: {
    backgroundColor: "pink",
    height: 50,
    width: 50
  },

  blocks: {
    height: 50,
    width: 50
  },

  progress: {
    height: 20,
    width: 250,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    fontSize:32
  },

  pause:{
    margin:10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:10,
    width:100
  }
});



