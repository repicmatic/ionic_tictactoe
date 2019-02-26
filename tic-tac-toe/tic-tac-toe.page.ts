import { Component, OnInit } from '@angular/core';
import TicTacToe from 'tictactoe-ai';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.page.html',
  styleUrls: ['./tic-tac-toe.page.scss'],
})
export class TicTacToePage implements OnInit {

	//prazen board/igralna plošča
	board: any;
	//UI igralec
	aiTeam: any;
	aiPlayer: any;
	//njegova poteza
	move: any;

	//konec
	konec: any;

	//stevci
	zmaga: number;
	neodloceno: number;
	poraz: number;

  	constructor() { 

  		//inicializiram ploščo
    	this.board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
    	if(this.board==null){
    		console.log("Failed to initialize Board");
    	}

    	this.aiTeam = this.board.oppositePlayer("X");
    	if(this.aiTeam==null){
    		console.log("Failed to initialize aiTeam");
    	}

		this.aiPlayer = new TicTacToe.TicTacToeAIPlayer();
		this.aiPlayer.initialize(this.aiTeam, this.board);
		if(this.aiPlayer==null){
    		console.log("Failed to initialize aiPlayer");
    	}

  		this.zmaga = 0;
  		this.neodloceno = 0;
  		this.poraz = 0;

  	}

  	narediPotezo(xi,yi){
  		if(this.konec!=null){
    		return;
    	}

    	console.log("Poteza:" + xi + ", " + yi);

    	//jaz naredim potezo
    	var location = {
        	x: xi,
        	y: yi
      	}
    	this.board.makeMove('X', location)

    	//ai naredi potezo
    	this.move = this.aiPlayer.makeMove();
		if(this.move != null){
			this.board.makeMove(this.aiTeam, this.move);
		}

		console.log(this.board.board);

		//pogledamo ce je igre konec
		this.konec = this.board.winner();
		if(this.konec!=null){
			if(this.konec.cell=='O'){this.poraz += 1;}
			else if(this.konec.cell=='X'){this.zmaga += 1;}
			else{this.neodloceno+=1;}
		}
  	}

  	resetIgro(){
  		//inicializiram ploščo
    	this.board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
    	if(this.board==null){
    		console.log("Failed to initialize Board");
    	}

    	this.aiTeam = this.board.oppositePlayer("X");
    	if(this.aiTeam==null){
    		console.log("Failed to initialize aiTeam");
    	}

		this.aiPlayer = new TicTacToe.TicTacToeAIPlayer();
		this.aiPlayer.initialize(this.aiTeam, this.board);
		if(this.aiPlayer==null){
    		console.log("Failed to initialize aiPlayer");
    	}

    	this.konec = null;

  	}

	ngOnInit() {
  	}

}
