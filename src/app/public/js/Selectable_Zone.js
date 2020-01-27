//material_dashed_lines.dashSize= 3;
//## GEOMETRY AND MESHES
class Selectable_Zone {
    test = 1;
    mesh;
    line;
    constructor(ID, coords) {
        this.ID = ID; //WARNING THIS DOES NOT MATCH WITH COORDS ID

        let position = new THREE.Vector3(0, 1, 0);
        this.size = new THREE.Vector3(0.1, 0.1, 0.1);

        this.size.x = Math.abs(coords.coord1.x - coords.coord2.x);
        if (coords.coord1.x > coords.coord2.x) {
            //x size range
            position.x = coords.coord2.x + (this.size.x / 2);
        }
        else {
            position.x = coords.coord1.x + (this.size.x / 2);
        }

        this.size.y = Math.abs(coords.coord1.y - coords.coord2.y);
        if (coords.coord1.y > coords.coord2.y) {
            //y size range
            position.y = coords.coord2.y + (this.size.y / 2);
        } else {
            position.y = coords.coord1.y + (this.size.y / 2);
        }

        this.size.z = Math.abs(coords.coord1.z - coords.coord2.z);
        if (coords.coord1.z > coords.coord2.z) {
            //z size range
            position.z = coords.coord2.z + (this.size.z / 2);
        }
        else {
            position.z = coords.coord1.z + (this.size.z / 2);
        }

        this.geometry = new THREE.CubeGeometry(this.size.x, this.size.y, this.size.z);
        this.mesh = new THREE.Mesh(this.geometry, material_selectable);
        this.mesh.userData = { ID: ID };
        this.edges = new THREE.EdgesGeometry(this.geometry);
        this.line = new THREE.LineSegments(this.edges, material_dashed_lines);
        this.mesh.position.set(position.x, position.y, position.z);
        this.line.position.set(position.x, position.y, position.z);
        this.mesh.rotation.y = coords.rotation;
        this.line.rotation.y = coords.rotation;

        this.data = undefined;
    }

}