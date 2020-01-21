//material_dashed_lines.dashSize= 3;
//## GEOMETRY AND MESHES
class Selectable_Zone {
    test = 1;
    mesh;
    line;
    constructor(ID, position, size) {
        this.ID = ID;
        this.position = position;
        this.size = size;
        this.geometry = new THREE.CubeGeometry(this.size.x, this.size.y, this.size.z);
        this.mesh = new THREE.Mesh(this.geometry, material_selectable);
        this.edges = new THREE.EdgesGeometry(this.geometry);
        this.line = new THREE.LineSegments(this.edges, material_dashed_lines);
        this.mesh.position.set(position.x, position.y, position.z);
        this.line.position.set(position.x, position.y, position.z);
    }
}
