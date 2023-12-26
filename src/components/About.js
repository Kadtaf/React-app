import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            skillValue: '',
            title:"CV",
            contact:{name: "Nabil FILALY", profile:'images/zen5.jpg', email:"nabil.f@gmail.com"},
            skills:[
                {id:1, skill: 'Software engeneering'},
                {id:2, skill: 'UI Design'},
                {id:3, skill: 'Machines Learning'},
            ]

        }
    }

    setSkill = (event) => {
        this.setState({
            skillValue:event.target.value
        })
    }

    addSkill = (event) => {
        event.preventDefault()
        let skill = {
            id: [...this.state.skills].pop().id + 1,
            skill: this.state.skillValue
        }
        this.setState({
            skills: [...this.state.skills, skill]
        })
    }

    onDelete = (skill) => {
        let index = this.state.skills.indexOf(skill)
        let listSkills = [...this.state.skills];
        listSkills.splice(index, 1)
        this.setState({
            skills:listSkills
        })
    }

    render() {
        return(
            <div>
                <div className="card">
                    <div className="text-center card-header">
                        <strong><label>{this.state.title}</label></strong>
                    </div>
                    <div className="row p-2">
                        <div className="col col-auto">
                            <img width={130} src = {this.state.contact.profile} alt="Photo de profile" />
                        </div>
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item">{this.state.contact.name}</li>
                                <li className="list-group-item">{this.state.contact.email}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-header">
                        Skills : {this.state.skillValue}
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.addSkill}>
                            <div className="row">
                                <div className="col">
                                    <input
                                        type="text" name="skill"
                                        value={this.state.skillValue}
                                        onChange={this.setSkill}
                                        className="form-control"
                                        placeholder="Skill To Add"/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-dark" type="submit">Add</button>
                                </div>
                            </div>

                        </form>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Skills</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.skills.map((s, index) =>
                                            <tr key={index}>
                                                <td>{s.id}</td>
                                                <td>{s.skill}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => this.onDelete(s)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default About;