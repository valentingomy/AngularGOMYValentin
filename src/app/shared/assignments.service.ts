import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      
      id:1,
      nom: "Devoir 1 à rendre",
      dateDeRendu: new Date('2023-12-11'),
      rendu: false
    },
    {
      id:2,
      nom: "Devoir 2 à rendre",
      dateDeRendu: new Date('2023-01-10'),
      rendu: false
    },
    {
      id:3,
      nom: "Devoir 3",
      dateDeRendu: new Date('2024-01-01'),
      rendu: true
    }
    ];

  constructor(private logginService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)
    console.log("getAssignment id= " + id + " nom = " + a.nom)
    return of(a);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);

    this.logginService.log(assignment.nom, "ajouté !");

    return of("Assignment ajouté");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    this.logginService.log(assignment.nom, "modifié !");

    return of("Assignment modifié");
  }

  deleteAssignement(assignment:Assignment) :Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé !");


    return of("Assignment supprimé")
  }

}
